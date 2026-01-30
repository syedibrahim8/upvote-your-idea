import Idea from "../models/Idea.model.js";
import Vote from "../models/Vote.model.js";

export const createIdea = async (req, res) => {
      try {
            const { title, description, websiteURL } = req.body;

            if (!title || !description) {
                  return res.status(400).json({
                        success: false,
                        message: "Title and description are required",
                  });
            }

            const idea = await Idea.create({
                  title,
                  description,
                  websiteURL: websiteURL || null,
                  createdBy: req.user.id,
            });

            res.status(201).json({
                  success: true,
                  idea,
            });
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message,
            });
      }
};

export const getLeaderboard = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    // 1. Get user's active vote (if logged in)
    let userVote = null;
    if (userId) {
      const vote = await Vote.findOne({ userId }).select("ideaId");
      userVote = vote ? vote.ideaId : null;
    }

    // 2. Aggregate ideas with vote counts
    const ideas = await Idea.aggregate([
      {
        $lookup: {
          from: "votes",
          localField: "_id",
          foreignField: "ideaId",
          as: "votes"
        }
      },
      {
        $addFields: {
          voteCount: { $size: "$votes" }
        }
      },
      {
        $sort: { voteCount: -1, createdAt: -1 }
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      {
        $project: {
          votes: 0,
          "creator.password": 0
        }
      }
    ]);

    res.json({
      success: true,
      userVote,
      ideas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};