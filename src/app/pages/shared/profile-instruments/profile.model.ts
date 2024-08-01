
export class Profile {
    public userId : string = '';
    public userName : string = '';
    public userPhotoUrl : string = '';
    public userDescription : string = '';

    constructor(
        userId : string,
        userName : string, 
        userPhotoUrl : string, 
        userDescription : string, ) {
            this.userId = userId;
            this.userName = userName;
            this.userPhotoUrl = userPhotoUrl;
            this.userDescription = userDescription;
    }
}