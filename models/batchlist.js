var mongoose  =  require('mongoose');  

var blistSchema = new mongoose.Schema({
    rollno:{  
        type:String  
    },  
    name:{  
        type:String  
    },   
    department:{  
        type:String  
    },  
    batch:{  
        type:String  
    }
});

module.exports = mongoose.model('batchlist',blistSchema);