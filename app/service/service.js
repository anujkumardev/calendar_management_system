const { UserList , User} = require('./UserCalender.js');

const RegisterUser=(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    UserList.set(name,new User(name,email,2022));
    res.statusCode=200;
    res.send({msg:"user created"});
};

const setMeeting=(req,res)=>{
    
    const dd = req.body.dd;
    const mm = req.body.mm;
    const start = req.body.start;
    const duration = req.body.duration;
    const user_list = req.body.user_list;
    // checking if every user exist
    let flag=0;
    user_list.forEach(function(key){
        if(!UserList.has(key)) flag=1;
    })
    // creating a meeting
    if(flag === 0){
    UserList.get(user_list[0]).setUserMeeting(dd,mm,start,duration,user_list,1);
    res.statusCode=200;
    res.send({msg:"meeting is sheduled"});
    }
    else {
        res.statusCode=400;
        res.send({msg:"some users does not exist"});
    }
};

const getMeeting = (req,res)=>{
    const dd = req.body.dd;
    const mm = req.body.mm;
    let user = req.body.name;
    const meetingData = {
        day : dd,
        month : mm,
        meetings:new Array()
    };
    if(UserList.get(user).Calender.getDay(dd,mm)){
        const data = UserList.get(user).Calender.getDay(dd,mm);
        let i=0;
        for(const [strt, value] of data.entries()){
            meetingData.meetings.push({
                start : value[0],
                duration : value[1],
                user_list : [user]
            });
        const name = user;
        while(UserList.get(user).Calender.getDay(dd,mm).get(strt)[2] != name){
            user = UserList.get(user).Calender.getDay(dd,mm).get(strt)[2];
            meetingData.meetings[i].user_list.push(user);
        }
        i=i+1;
        user=name;
    }
        res.statusCode=200;
        res.send(meetingData);
    }
    else{
    res.statusCode=404;
    res.send({msg : "no meeting is scheduled"});
    }

};

module.exports = {
    RegisterUser,
    setMeeting,
    getMeeting
};




