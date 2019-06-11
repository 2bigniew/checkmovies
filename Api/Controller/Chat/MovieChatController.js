exports.handleChat = async function chatHandling(req, res, next) {
    const io = req.app.get('socket_io_movie_chat');;
    res.render('chat.ejs');
}