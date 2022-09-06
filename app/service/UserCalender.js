const UserList=new Map();
function User(name,email, yyyy) {
    this.email = email;
    this.name = name;
    this.Calender = new Calender(yyyy);
    this.setUserMeeting = (dd,mm,start,duration,user_list,i)=>{
        if(i-1=== user_list.length)return ;
        if(i < user_list.length)
        this.Calender.setDay(dd,mm,start,duration,user_list[i]);
        else
        this.Calender.setDay(dd,mm,start,duration,user_list[0]);
        if(i<user_list.length)
        UserList.get(user_list[i]).setUserMeeting(dd,mm,start,duration,user_list,i+1);
    }
}
function Calender(yyyy){
    this.year = yyyy;
    this.Days = Array.from(new Array(13),()=>new Array(31));
    this.setDay = (dd,mm,start,duration,nxt_user)=>{
        if(this.Days[mm][dd])
        this.Days[mm][dd].setMeeting(start,duration,nxt_user);
        else{
        this.Days[mm][dd] = new Meetings();
        this.Days[mm][dd].setMeeting(start,duration,nxt_user);}
    };
    this.getDay = (dd,mm)=>{
        if(this.Days[mm][dd])
        return this.Days[mm][dd].getMeeting();
        else
        return null;
    }
}
function Meetings(){
    this.meeting = new Map();
    this.setMeeting = (start,duration,nxt_user)=>{
        this.meeting.set(start,[start,duration,nxt_user]);
    }
    this.getMeeting = ()=>{
        return this.meeting;
    }
}
module.exports={
    UserList,
    User
}