export class TRexStatus {
    error: number;
    voltage: number;
    rmCurrent: number;
    lmCurrent: number;
    accX: number;
    accY: number;
    accZ: number;
    impactX: number;
    impactY: number;
    impactZ: number;

    toString() {
        return 'Err: ' + this.error + ', ' +
            'Volt: ' + this.voltage + ', ' +
            'RMcur: ' + this.rmCurrent + ', ' +
            'LMcur: ' + this.lmCurrent + ', ' +
            'Acc: [' + this.accX + ',' + this.accY + ',' + this.accZ + '], ' +
            'Imp: [' + this.impactX + ',' + this.impactY + ',' + this.impactZ + ']';
    }
}
