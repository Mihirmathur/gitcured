var mongoose = require('mongoose');
var Questions = mongoose.model('Questions');
var Users = mongoose.model('Users');
var Chat = mongoose.model('Chat');

module.exports = {
  index: function(req, res) {
    Questions.find({}, function(err, results) {
      if (err) {
        console.log("Error getting all questions: ", err);
      } else {
        res.json(results);
      }
    })
  },
  create: function(req, res) {
    var question = new Questions(req.body);
    question.save(function(err) {
      if (err) {
        console.log("Error saving the question: ", err);
        res.send(false)
      } else {
        console.log("Succesfully saved a new question");
        res.send(true)
      }
    })
  },
  upVote: function(req, res) {
    Questions.findOne({_id: req.body.question._id}, function(err, question) {
        User.findOne({_id: req.body.user._id}, function(err, user) {
          if (err) {
            console.log("Error getting question/user to upVote: ", err);
          } else {
            question.up_votes.push(user);
            user._questionsUpVote.push(question);

            question.save(function(err) {
              user.save(function(err) {
                if (err) {
                  console.log("Error saving a new up_vote: ", err);
                } else {
                  console.log("Succesfully added a new up_vote");
                  res.send(true);
                }
              })
            })
          }
        })
    })
  },
  chat: function(req, res) {
    var chat = new Chat(req.body.chat);
    console.log(req.body);
    // req.body = {""}
    Question.findOne({_id: req.body.question._id}, function(err, question){
      User.findOne({_id: req.body.user._id},function(err, user) {
        if(err){
          console.log("ERROR", error);
        } else {
          question.chat.push(chat);
        }
      })
    })


  }
}
