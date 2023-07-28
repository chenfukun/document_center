//1 get /lso/route/overview
response = {
    TotalPakgs: 7000,
    datas:[
        {
            route: "190",
            status: "checked, uncheck, checking",//考虑多个司机的情况下， 全部检查， 没开始检查， 任意一个司机被检查
            drivers: [
                {
                    driver: "Mr.A",
                    bScanedQty: 10,
                    excep: {
                        overage: 1,
                        short: 1,
                    }
                }
            ],
            excep: {
                overage: 1,
                short: 1,
            },
            pakgs: {
                driverScanedQty: 100,
                bScanedQty: 100
            }
        }
    ]
}

//2 get /lso/driver/overview

response = {
    TotalPakgs: 7000,
    datas:[
        {
            driver: "Mr.A",
            status: "checked, uncheck",
            routes: [{
                route: "190",
                bScanedQty: 10,
                excep: {
                    overage: 1,
                    short: 1,
                }
            }],
            excep: {
                overage: 1,
                short: 1,
            },
            pakgs: {
                driverScanedQty: 100,
                bScanedQty: 100
            }
        }
    ]
}


//post /lso/qc_scan_result/latest-get
request = {
    assigneeDriver: 'Mr.A',
    assigneeRoutes: ["190", "191"],
}
response = {qcId: '131654411'}

//post /lso/qc-scan-result/generate  (生成一个qc记录， 手机端取qcId 用于绑定qc 扫描上来的包裹)
request = {
    assigneeDriver: 'Mr.A',
    assigneeRoutes: ["190", "191"],
}
response = {qcId: '131654411'}


//get /lso/qc-scan-result/:qcId/in-progress
response = {
    driverAssigneePkgs: [{sequence: 1,driver: 'Mr.A',trackingNo: '1234567',route: '190'}],
    qcScanPkgs:[{qcId: '165456789915', trackingNo: '1234567', status: 'scanned'}]
}


//post /lso/qc-scan-data/add
request = {
    qcId: "165456789915",
    scannedTrackingNo: "78964123"
}

3
//post /lso/qc-scan/:qcId/analysis
response = {
    excepPkgs: [{_id: "123465498798", route: 'a', sequence: '1', trackingNO: '78974613', driver: 'Mr.A'}],
    result: [{_id: "123465498798", route: 'a', sequence: '1', trackingNO: '78974613', driver: 'Mr.A', status: "Overage, Short"}] // trackingNo 是一定会有的， 它来源于两部分， driver_assignee & qc_scan,   overage 只存在qc_scan 有， 但是driver_assignee没有, short=> qc_scan没有 或者 driver_scan 没有
}

//delete /lso/qc-scan-data/:qcId/trackingNo/:trackingNo

3
//put /lso/qc-scan-result/:qcId/submit (此时去填充lso_driver_scan_package，lso_drive_assignee_package)
request = {
    status: "Close",
    driverAssigneeQty: 100,
    shortQty: 2,
    overageQty: 2,
    driverSigatureFileId: "zz"
}


















//----------------表结构定义------------------
// name: lso_qc_scan_result
// entity: {
//     _id: "qcId",
//         driver: 'MR.A',
//         routes:["190", "191"],
//         status: "New, Close"
//     driverAssigneeQty: 100,
//         short: 2,
//         overage: 2,
//         driverSigatureFileId: 'xxxx',
// }
//
// name:lso_drive_assignee_package
// entity: {
//     qcId: '165456789915',
//         sequence: 1,
//         driver: 'Mr.A',
//         trackingNo: '1234567',
//         route: '190'
// }
//
// name:lso_driver_scan_package
// entity: {
//     qcId: '165456789915',
//         sequence: 1,
//         driver: 'Mr.A',
//         trackingNo: '1234567',
//         route: '190'
// }
//
// name:lso_qc_scan_package
// entity: {
//     qcId: '165456789915',
//         trackingNo: '1234567',
//         status: 'scanned,  removed'
// }