var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/students',{
  useNewUrlParser: true,
 useUnifiedTopology: true
})
var Schema=mongoose.Schema;
var commentSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  gendr:{
    type:Number,
    enum:[0,1],
    default:0
  },
  age:{
    type:Number
  },
  hobbies:{
    type:String
  }
});
module.exports=mongoose.model('Comment',commentSchema)
//为啥我在demo里面写的更新的那个password：‘123’那个数据没了？？
//我写test数据库里的数据怎么不见了？就是那个demo2.js的文件//数据库里面有，好几个数据库，里面有集合
//另外我想试一下脏数据...比如说就不写名字就提交有什么后果，或者不写年龄就提交有什么后果
//这页结合路由，路由能看懂，这也的职能我又看不懂了//相当于解耦了，功能复用的直接抽离成一个文件
//Student.find
