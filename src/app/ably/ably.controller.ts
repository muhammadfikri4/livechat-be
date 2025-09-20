import Ably from "ably";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../../libs";
import { TokenDecodeInterface } from "../../interface";
import { prisma } from "../../config";
import { eventChannel } from "../../utils/const";

const client = new Ably.Rest({ key: process.env.ABLY_API_KEY! });
const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY! });

export const ablyAuthentication = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const payload = verify(token, config.JWT_SECRET as string) as TokenDecodeInterface;
    const clientId = `user:${payload.userId}`;

    const tokenRequest = await client.auth.createTokenRequest({ 
      clientId,
      ttl: 60 * 60 * 1000 
    });
    
    res.setHeader("Content-Type", "application/json");
    res.json(tokenRequest);
    
  } catch (error) {
    console.error("Ably auth error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

// ✅ DEBUG: Enhanced presence listener with detailed logging
// const presenceChannel = realtime.channels.get("presence:users");
// const userTimeouts = new Map<string, NodeJS.Timeout>();

// console.log("🔥 Presence channel initialized, waiting for events...");

// presenceChannel.presence.subscribe(async (msg) => {
//   try {
//     const userId = msg.clientId?.split(":")[1];
//     if (!userId) {
//       console.log("❌ No userId found in clientId:", msg.clientId);
//       return;
//     }

//     console.log("🎯 PRESENCE EVENT:", {
//       action: msg.action,
//       userId,
//       clientId: msg.clientId,
//       timestamp: new Date().toISOString()
//     });

//     if (msg.action === "enter") {
//       const existingTimeout = userTimeouts.get(userId);
//       if (existingTimeout) {
//         clearTimeout(existingTimeout);
//         userTimeouts.delete(userId);
//         console.log(`⏰ Cleared existing timeout for user ${userId}`);
//       }

//       // Update database
//       await prisma.user.update({ 
//         where: { id: userId }, 
//         data: { 
//           isOnline: true, 
//           lastSeen: new Date() 
//         } 
//       });

//       console.log(`✅ Database updated: User ${userId} is ONLINE`);
      
//       // Broadcast immediately
//       const broadcastResult = await broadcastToFriends(userId, "online");
//       console.log(`📡 Broadcast result for ${userId} ONLINE:`, broadcastResult);
//     }

//     if (msg.action === "leave") {
//       console.log(`⏳ Setting timeout for user ${userId} to go offline...`);
      
//       const timeout = setTimeout(async () => {
//         try {
//           await prisma.user.update({ 
//             where: { id: userId }, 
//             data: { 
//               isOnline: false, 
//               lastSeen: new Date() 
//             } 
//           });
          
//           userTimeouts.delete(userId);
//           console.log(`❌ Database updated: User ${userId} is OFFLINE`);
          
//           const broadcastResult = await broadcastToFriends(userId, "offline");
//           console.log(`📡 Broadcast result for ${userId} OFFLINE:`, broadcastResult);
//         } catch (error) {
//           console.error(`Error setting user ${userId} offline:`, error);
//         }
//       }, 5000); // ✅ Reduced to 5 seconds for testing

//       userTimeouts.set(userId, timeout);
//     }

//   } catch (error) {
//     console.error("❌ Presence event error:", error);
//   }
// });

// ✅ Enhanced broadcast function with detailed logging
export async function broadcastToFriends(userId: string, status: "online" | "offline") {
  try {
    console.log(`🔍 Getting user and friends for ${userId}...`);

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, 
        name: true, 
        isOnline: true,
        lastSeen: true 
      }
    });

    if (!user) {
      console.log(`❌ User ${userId} not found in database`);
      return { success: false, error: "User not found" };
    }

    console.log(`👤 User found:`, user);

    // Get friendships
    const friendships = await prisma.friend.findMany({
      where: {
          userId 
      },
      select: { userId: true, friendId: true },
    });

    console.log(`🤝 Found ${friendships.length} friendship records:`, friendships);

    // Extract friend IDs
    const friendIds = new Set<string>();
    friendships.forEach(friendship => {
      if (friendship.userId === userId) {
        friendIds.add(friendship.friendId);
      } else {
        friendIds.add(friendship.userId);
      }
    });

    console.log(`👥 Unique friend IDs (${friendIds.size}):`, Array.from(friendIds));

    if (friendIds.size === 0) {
      console.log(`⚠️ No friends found for user ${userId}`);
      return { success: true, friendsCount: 0 };
    }

    // Prepare broadcast data
    const broadcastData = {
      userId: user.id,
      name: user.name,
      image: null,
      status,
      isOnline: status === "online",
      lastSeen: user.lastSeen?.toISOString(),
      timestamp: new Date().toISOString()
    };

    console.log(`📤 Broadcasting data:`, broadcastData);

    // Broadcast to each friend
    const results = [];
    for (const friendId of friendIds) {
      try {
        const channelName = eventChannel.friendStatus(friendId);
        console.log(`📡 Publishing to channel: ${channelName}`);
        
        const channel = realtime.channels.get(channelName);
        await channel.publish("status-change", broadcastData);
        
        console.log(`✅ Successfully published to friend ${friendId}`);
        results.push({ friendId, success: true });
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(`❌ Failed to broadcast to friend ${friendId}:`, error);
        results.push({ friendId, success: false, error: error.message });
      }
    }

    console.log(`📊 Broadcast summary:`, {
      totalFriends: friendIds.size,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    });

    return { 
      success: true, 
      friendsCount: friendIds.size,
      results 
    };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Error in broadcastToFriends:", error);
    return { success: false, error: error.message };
  }
}