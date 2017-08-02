export class TRexStatus {
    voltage: number
    rmSpeed: number;
    rmCurrent: number;
    rmBrake: boolean;
    lmSpeed: number;
    lmCurrent: number;
    lmBrake: boolean;
    accX: number;
    accY: number;
    accZ: number;
    impactX: number;
    impactY: number;
    impactZ: number;
    
    toString() {
        return 'Volt: ' + this.voltage + ', ' +
            'RMspd: ' + this.rmSpeed + ', ' +
            'RMcur: ' + this.rmCurrent + ', ' +
            'RMbrk: ' + this.rmBrake + ', ' +
            'LMspd: ' + this.rmSpeed + ', ' +
            'LMcur: ' + this.lmCurrent + ', ' +
            'LMbrk: ' + this.rmBrake + ', ' +
            'Acc: [' + this.accX + ',' + this.accY + ',' + this.accZ + '], ' +
            'Imp: [' + this.impactX + ',' + this.impactY + ',' + this.impactZ+ ']';
    }
}