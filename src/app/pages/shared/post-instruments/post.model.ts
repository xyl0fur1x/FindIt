export class Post {
    public postId : number = 0;
    public userName:string = '';
    public header:string = '';
    public description:string = '';
    public lat: number = 0;
    public lng: number = 0;


    constructor(
        postId : number,
        userName:string, 
        header:string, 
        description:string, 
        lat:number, 
        lng: number) {
            this.postId = postId;
            this.userName = userName;
            this.header=header;
            this.description = description;
            this.lat = lat;
            this.lng = lng
        }

    
}