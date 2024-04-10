export const getVouchers = [
    {
        id: 1,
        code: 58694,
        disount: 10,
        usedBy: ''
    },
    {
        id: 2,
        code: 39452,
        discount: 7,
        usedBy: ''
    },
    {
        id: 3,
        code: 94033,
        discount: 12,
        usedBy: ''
    },
    {
        id: 4,
        code: 91825,
        discount: 15,
        usedBy: ''
    },
    {
        id: 5,
        code: 22134,
        discount: 20,
        usedBy: ''
    },
    {
        id: 6,
        code: 62738,
        discount: 8,
        usedBy: ''
    },
]

export const updateVoucher = (voucherId, usedBy) => {
    const index = getVouchers.findIndex(voucher => voucher.id === voucherId);

    if (index !== -1) {
        getVouchers[index].usedBy = usedBy;
        console.log(`Voucher updated for UsedBy with ID ${voucherId}`);
    } else {
        console.log(`Voucher with ID ${voucherId} not found`);
    }
}