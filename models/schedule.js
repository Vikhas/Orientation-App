var mongoose  =  require('mongoose');  

var schedSchema = new mongoose.Schema({
    batch:{  
        type:String  
    },  
    dayno:{  
        type:String  
    },   
    date:{  
        type:String  
    },  
    day:{  
        type:String  
    }, 
    stime:{  
        type:String  
    }, 
    etime:{  
        type:String  
    }, 
    ses:{  
        type:String  
    }, 
    staffinc:{  
        type:String  
    }, 
    venue:{  
        type:String  
    }, 
    batchinc:{  
        type:String  
    }

});

module.exports = mongoose.model('schedule',schedSchema);