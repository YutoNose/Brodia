const User = require("../models/User");
const router = require("express").Router();

//CRUD create,read,update,delete
//ユーザー情報の更新
router.put("/:id",async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                //$set:すべての要素に対して変更
                $set: req.body,
            });
            res.status(200).json("ユーザー情報が更新されました");

        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("あなたは自分のアカウントのときだけ情報を更新できます")

    }
});
//ユーザー情報の削除
router.delete("/:id",async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("ユーザー情報が削除されました");

        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("あなたは自分のアカウントのときだけ情報を削除できます")

    }
})

//ユーザー情報の取得
router.get("/:id",async(req,res) => {
        try{
            const user = await User.findById(req.params.id);
            //取得したらいけないデータを取り除く
            const {password, updatedAt, ...other} = user._doc;
            res.status(200).json(other);
        }catch(err){
            return res.status(500).json(err);
        }
});


//ユーザーのフォロー
//paramsがURLに載っかっている方。
//情報を更新する内容なのでPUT
router.put("/:id/follow",async(req,res) => {
    //ユーザーをフォローできる条件...自分自身はフォローできない。
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //いまからフォローする相手が、自分自身をフォロワーに持っていない。
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    }, 
                })
                await user.updateOne({
                    $push: {
                        followings: req.params.id,
                    },  
                });
                return res.status(200).json("フォローに成功しました！")
            }else{
                return res.status(403).json("あなたはすでにこのユーザーをフォローしています。")
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(500).json("自分自身をフォローすることはできません。");
    }
});

//ユーザーのフォロー解除
//ユーザーのフォロー
//paramsがURLに載っかっている方。
//情報を更新する内容なのでPUT
router.put("/:id/unfollow",async(req,res) => {
    //ユーザーをフォローできる条件...自分自身はフォロー解除できない。
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //いまからフォロー解除する相手が、自分自身をフォロワーに持っていない。
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId,
                    }, 
                })
                await user.updateOne({
                    $pull: {
                        followings: req.params.id,
                    },  
                });
                return res.status(200).json("フォロー解除に成功しました！")
            }else{
                return res.status(403).json("あなたはこのユーザーをフォローしていません。")
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(500).json("自分自身のフォローを解除することはできません。");
    }
});

//router.get("/",(req,res) => {
//    res.send("user router")
//})

module.exports = router;
