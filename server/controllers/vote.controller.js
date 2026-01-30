import Vote from "../models/Vote.model.js";
import Idea from "../models/Idea.model.js";

export const voteIdea = async (req, res) => {
      try {
            const userId = req.user.id;
            const { ideaId } = req.body;

            const existingVote = await Vote.findOne({ userId });

            // CASE 1: Remove vote
            if (!ideaId) {
                  if (!existingVote) {
                        return res.json({
                              success: true,
                              userVote: null,
                        });
                  }

                  await Vote.deleteOne({ userId });

                  return res.json({
                        success: true,
                        userVote: null,
                  });
            }

            // CASE 2: No existing vote → Cast vote
            if (!existingVote) {
                  const vote = await Vote.create({ userId, ideaId });

                  return res.json({
                        success: true,
                        userVote: vote,
                  });
            }

            // CASE 3: Same idea → No-op
            if (existingVote.ideaId.toString() === ideaId) {
                  return res.json({
                        success: true,
                        message: "You have already voted!!"
                  });
            }


            // Once in 24 hours per user
            
            // CASE 4: Change vote
            existingVote.ideaId = ideaId;
            await existingVote.save();

            return res.json({
                  success: true,
                  userVote: existingVote,
            });
      } catch (error) {
            // Handles unique index / race edge cases
            if (error.code === 11000) {
                  return res.status(409).json({
                        success: false,
                        message: "User already has a vote",
                  });
            }

            res.status(500).json({
                  success: false,
                  message: error.message,
            });
      }
};