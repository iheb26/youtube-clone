export const API_KEY='AIzaSyDgEq_9iHbZiARkQMNIzzd9OVvUMdlEn6I';
export const value_converter=(value)=>{
    if(value>=100000)
    {
        return Math.floor(value/100000)+"M";
    }else if(value>1000){
        return Math.floor(value/1000)+"K";
    }else{
        return value;
    }
}