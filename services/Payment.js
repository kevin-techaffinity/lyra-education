import { post } from "../utilities/httpRequest";

export const payHere = async ({amount, item_name}) => {
  const response = await post({request: `/payhere`, body: {amount, item_name} })
  return response;
}

export const checkVoucher = async (voucher) => {
  await put({request: `/voucher`, body: {voucher}})
}

export const choosePlan = async () => {
  const url = 'https://secure.paygate.co.za/payweb3/process.trans';
  const formData = new FormData();

  formData.append('PAYGATE_ID', '10011072130');
  formData.append('PAY_REQUEST_ID', '1B6C5CFB-57C8-8419-F3C4-2C7513751BA9');
  formData.append('REFERENCE', 'pgtest_123456789');
  formData.append('CHECKSUM', '2a5459e178e7360c932dff81de15b52f');

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  }).then(async (res) => {
    const result = await res.json();

    console.log('Result ', result);
  });
};
