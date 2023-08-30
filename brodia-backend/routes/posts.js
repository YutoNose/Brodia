const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//投稿を作成する
router.post("/", async(req,res) =>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch(err){
        return res.status(500).json(err);
    }
})

//投稿を更新する
router.put("/:id",async(req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿編集に成功しました!")
        }else{
            return res.status(403).json("あなたは他の人の投稿を編集できません");
        }
    }catch(err){
        return res.status(403).json()
    }
})

//特定の投稿を削除する
router.delete("/:id",async(req,res) =>{
    const post = await Post.findById(req.params.id);

    if(post.userId === req.body.userId){
        try{
            //const post = await Post.findByIdAndDelete(req.params.id);
            await  post.deleteOne();
            res.status(200).json("投稿が削除されました");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("あなたは自身の投稿のみ削除することができます。");
    }
})

//特定の投稿を取得する
router.get("/:id",async(req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});

//特定の投稿にいいねを押す。
router.put("/:id/like",async(req,res) => {
    //reqは、いいねを押す対象となるID
    try{
        const post = await Post.findById(req.params.id);
        //まだ投稿にいいねが押されていなかったら
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                }, 
            });
            return res.status(200).json("投稿にいいねを押しました！")
        }else{
            //いいねしているユーザーIDを取り除く
            await post.updateOne({
                $pull:{
                    likes: req.body.userId,
                }
            })
            return res.status(200).json("投稿にいいねを外しました")
        }
    }catch(err){
        return res.status(500).json(err);
    }
});

//タイムラインの投稿を取得
//"/timeline"とすると/:idとの区別できないので注意
router.get("/timeline/all", async(req,res) => {
    try{
        //自分自身の投稿一覧の出力
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id})
        //自分がフォローしている友達の投稿内容を全て取得する。
        //currentUserが非同期処理のときは、Promise.allを使う
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) =>{
                return Post.find({userId: friendId});
            })
        );
        //mapで一つ一つ取り出しているため、スプレッド演算子が必要
        return res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;
