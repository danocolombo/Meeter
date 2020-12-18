
export class OpenShareGroup{
    public id: String;
    public title: string;
    public meetingId: string;
    public gender: string;
    public location: string;
    public facilitator: string;
    public cofacilitator: string;
    public attendance: number;
    public notes: string;

    constructor(){
        this.id = '';
        this.title = '';
        this.meetingId = '';
        this.gender = 'x';
        this.location = '';
        this.facilitator = '';
        this.cofacilitator = '';
        this.attendance = 0;
        this.notes = '';
    }
}