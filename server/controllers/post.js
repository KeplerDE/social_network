const Post = require("../models/post");

exports.createPost = async (req, res) => {
    const { content } = req.body;
    
    console.log("User ID:", req.user ? req.user._id : "User object not available");
    
    // Проверяем наличие контента
    if (!content || content.trim() === "") {
        return res.status(400).json({
            error: "Content is required",
        });
    }
    
    try {
        // Создаем новый пост
        const post = new Post({ content, postedBy: req.user ? req.user._id : null });
        
        console.log("New Post Object:", post);
        
        // Сохраняем пост в базу данных
        await post.save();
        
        console.log("Post saved successfully:", post);
        
        // Отправляем созданный пост клиенту
        res.status(201).json(post);
    } catch (err) {
        // В случае ошибки отправляем статус 500 и сообщение об ошибке
        console.error(err);
        res.status(500).json({ error: "An error occurred while saving the post" });
    }
};
