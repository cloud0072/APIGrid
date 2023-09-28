const d1 = new Date(2023, 9, 10)
const d2 = new Date(2023, 9, 1)
const d3 = new Date(2023, 8, 1)
console.log(d1.getTime())
console.log(d2.getTime())
console.log(d3.getTime())


const t = {
  "createdAt": 1696867200000,
  "createdBy": "54d23a383ec64d25a907746002b86029",
  "fieldUpdatedMap": {
    "fld1234567890": {"at": 1696867200000, "by": "54d23a383ec64d25a907746002b86029"},
    "fldaPpRhAbMyL": {"at": 1695888395483, "by": "54d23a383ec64d25a907746002b86029"}
  }
}

const t2 = {
  "createdAt": 1695797567728,
  "createdBy": "54d23a383ec64d25a907746002b86029",
  "fieldUpdatedMap": {
    "fldaPpRhAbMyL": {"at": 1695797579550, "by": "54d23a383ec64d25a907746002b86029"},
    "fldfi6nYNygQr": {"at": 1695884487359, "by": "54d23a383ec64d25a907746002b86029"},
    "fldhyCK8JrR9Z": {"at": 1695888397078, "by": "54d23a383ec64d25a907746002b86029"}
  }
}
console.log(JSON.stringify(t))
