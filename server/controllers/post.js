const Post = require("../models/post");
const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    });


exports.createPost = async (req, res) => {
    const { content, image } = req.body;
    
    console.log("User ID:", req.user ? req.user._id : "User object not available");
    
    // Проверяем наличие контента
    if (!content || content.trim() === "") {
        return res.status(400).json({
            error: "Content is required",
        });
    }
    
    try {
        // Создаем новый пост
        const post = new Post({ content, image, postedBy: req.user ? req.user._id : null });
        
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



exports.uploadImage = async (req, res ) => {
// console.log("req files =>", req.files);
try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log("Uploaded image URL => ", result);
    res.json({
    url: result.secure_url,
    public_id: result.public_id,
    });
    } catch (err) {
    console.log(err);
    }
    };