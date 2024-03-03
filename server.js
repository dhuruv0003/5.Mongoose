const mongoose=require ("mongoose");

async function main(){
    await mongoose.connect('mongodb://localhost:27017/test');
}

main().then(()=>{
    console.log("Connection successfull");
}).catch((err)=> console.log(err)); 

// Schema=> 
//     Schema defines the shape or structure of the documents within the collection. 

    const userSchema=new mongoose.Schema({
        name:String,
        email:String,
        age:Number
    });

// Model (read from model.notes line 13)
//assume user be model class
    // const Employee=mongoose.model("Employee",userSchema);

    const User=mongoose.model("User",userSchema) ;

// Inserting object into schema of class model.
// here model class name is user . So we create a new object of user. 

    const user1=new User({
        name:"dhuruv",
        email:"dhruvdk02@bugu.com",
        age:20
    });

    // user1.save();
// .save() function return a promice which can be resolved asynchroniusly 

    user1.save().then((res)=>
    console.log(res))
    .catch((err)=>
    console.log(err));

    const user2=new User({
        name:"raju",
        email:"raju@gawar.com",
        age:69
    })
    user2.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })

    const user3=new User({
        name:"gagu",
        email:"gagu@goo.com",
        class:12
    });
    user3.save().then((res)=>{
        console.log(res)
    }).catch((err)=>
    {
        console.log(err)
    })

// TO Insert details of many user1, similar to that of mongoshell 

    User.insertMany([
        {
            name:"Gaurav",
            email:"gaurav>gmail.com",
            age:32
        },{
            name:"pappi",
            email:"papi.gamil.com",
            age:21
        },{
            name:"Gomu",
            email:"gomu@gmail.com",
            age:19
        }]).then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        
// mongoose
// model.find()=>     .find() fucntion return a query object. Though this object is not a promise object but then also we can use .then() function along with it.
// eg=>       

    User.find({}).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err);
    })

//eg2=> 

    User.find({age:{$gte:25}}).then((res)=>console.log(res)).catch((err)=>{
        console.log(err);
    }) 
    
// This res that we get is int the form of array. So we can iterate over it  

    User.find({age:{$gte:25}})
    .then((res)=>{
    console.log(res[0].email)
    })
    .catch((err)=>{
        console.log(err)
    }) 

// Noe if we want only single user then we use .findOne() method

    User.findOne({age:{$lte:23}}).then((res)=>{
    console.log(res)})
    .catch((err)=>
    {
        console.log(err);
    })

// .find(ById() 

    User.findById('65e44dab3ee45436d19945f1').then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

//Update

//   1.  User.updateOne(<filter>,<new update>,<options>)

        // User.updateOne({ nam : "gagu" },{ age : 29}).
        //then((res)=>console.log(res))
        //.catch((err) =>console.log(err));

// o/p=>   {
//             acknowledged: true,
//             modifiedCount: 1,
//             upsertedId: null,
//             upsertedCount: 0,
//             matchedCount: 1
//         }

        User.find({name:"gagu"})
        .then((res)=>console.log(res))  
        .catch((err)=>console.log(err))

//   2.  User.updateMany()

        User.updateMany({age:{$gt:40}},{age:45})
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))

        
//  note :- Here we are not getting the proper output, so to this we need to user find and update method.


//   3.  User.findByIdAndUpdate()   =>  This function will find the user and upadte the properties of the user.

        User.findOneAndUpdate({age:{$lte:21}},{age:16}).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err);
        })

// here we get the pproper o/p rather than the acjknowledgement. But still in output we get the prvious result before the output .
// So for this we use new option which is by default, but we make it true 

// o/p=>   {
//             _id: new ObjectId('65e44dab3ee45436d19945ef'),
//             name: 'dhuruv',
//             email: 'dhruvdk02@bugu.com',
//             age: 20,
//             __v: 0
//         }

        User.findOneAndUpdate({age:{$lt:25}},{age:69},{new:true}).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })


//   4.  User.findOneAndUpdate()

//    syntax => User.findByIdAndUpdate(id,{update},{new:true}).then().catch()

    User.findByIdAndUpdate(
        "65e44dab3ee45436d19945f4",
        { name: "maharaj" },
        { age: 29 },
        { email: "mahara.gamil.com" },
        { new: true }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  
// Delete Operations=>

// 1.  User.deleteOne()=>

        User
        .deleteOne({ name: "maharaj" })
        .then((res) => console.log(res))
        .catch((err) => console.log());

// 2.   User.deleteMany()=>.

        User.deleteMany({ age: { $gt: 40 } })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

// 3.  User.findByIdAndDelete() => In order to display the result of the documeent we delete we use find and delete

        User.findByIdAndDelete("65e44dab3ee45436d19945f2")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));


// 4.   User.findOneAndDelete()=>

        User.findOneAndDelete({ name: "gagu" })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));