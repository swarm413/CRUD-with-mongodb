var fs=require("fs");
var express=require('express');
var Student=require('./students.js')
var router=express.Router();
router.get('/students',function(req,res){
  Student.find(function(err,students){
    if(err){
      return res.status(500).send('Server error.')
    }
    res.render('index.html',{
      students:students
    })
  })
});
router.get('/students/new',function(req,res){res.render("new.html")
})
router.post('/students/new',function(req,res){
  new Student(req.body).save(function(err,data){
      if(err){return res.status(500).send('Server Error!')}
        res.redirect('/students');
    })
})
router.get('/students/edit',function(req,res){
  /*已更正：
  我说哪错了，这网页的ID跟数据库里的ID不一样，当然不一样，另外首页路由的数据还是./json 这肯定不能渲染啊，我是不是把首页的路由写到/edit了？
 */
 Student.findById(req.query.id.replace(/"/g,''),function(err,student){
   if(err){return res.status(500).send('Server Error!')}
 res.render('edit.html',{student:student})
 })
})
/*这里我真是自作聪明，用的Student.find({'id':req.query.id},function(err,student){...}
结果.find方法不能查询id包括_id，最后还是得用.findById方法或者用.findByIdAndUpdate方法
这里用正则了，把ID的""去掉。不然数据库里面找不到返回的是空数组。这个ID双引号我还是有点懵
*/
router.post('/students/edit',function(req,res){
  Student.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body,function(err,student){
    if(err){return res.status(500).send('Server Error!')}
  res.redirect('/students')
})
})
//为什么有错了？是找着ID了，问题是 我没传新数据！A.findByIdAndUpdate(id, update, options, callback)
router.get('/students/delete',function(req,res){
  Student.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
    if(err){return res.status(500).send('Server Error!')}
    res.redirect('/students')
  })
})
//顺便我想看一下.remove方法里面的回调参数，err我理解，后面那个参数干嘛用的..官方文档里面没有，算了
module.exports=router;
