# example-submission

### * Programming
**Deploy on AWS Lambda and RDS MariaDB**

**API : https://ee4z9lcs79.execute-api.ap-southeast-1.amazonaws.com/latest/api**

  - Admin can increase user cryptocurrency balance.
    - use **PATCH** https://ee4z9lcs79.execute-api.ap-southeast-1.amazonaws.com/latest/api/wallet/increase/:id
    - JSON { "amount" : จำนวนที่ต้องการเพิ่ม }
  - Admin can decrease user cryptocurrency balance.
    - use **PATCH** https://ee4z9lcs79.execute-api.ap-southeast-1.amazonaws.com/latest/api/wallet/decrease/:id
    - JSON { "amount" : จำนวนที่ต้องการลด }
  - Admin can see all total balance of all cryptocurrency.
    - use **GET** https://ee4z9lcs79.execute-api.ap-southeast-1.amazonaws.com/latest/api/wallets/total
  - Admin can add other cryptocurrency such XRP, EOS, XLM to wallet.
    - use **POST** https://ee4z9lcs79.execute-api.ap-southeast-1.amazonaws.com/latest/api/crypto/create
    - JSON { "currency" : ชื่อ Cryptocurrency }
  - Admin can manage exchange rate between cryptocurrency.
    - use **POST** https://ee4z9lcs79.execute-api.ap-southeast-1.amazonaws.com/latest/api/exchangerate/create
    - JSON { "crypto_id" : ไอดีของ Crypto ตั้งต้น , "tocrypto_id" : ไอดีของ Crypto ปลายทาง, "rate" : อัตราการแลกเปลี่ยน }
    - use **PATCH** https://ee4z9lcs79.execute-api.ap-southeast-1.amazonaws.com/latest/api/exchangerate/update
    - JSON { "crypto_id" : ไอดีของ Crypto ตั้งต้น , "tocrypto_id" : ไอดีของ Crypto ปลายทาง, "rate" : อัตราการแลกเปลี่ยนที่ต้องการเปลี่ยนแปลง }
  - User can transfer cryptocurrency to other.
  - User can transfer cryptocurrency to other with difference currency such ETH to BTC with exchange rate.
    - use **PATCH** https://ee4z9lcs79.execute-api.ap-southeast-1.amazonaws.com/latest/api/wallet/transfer
    - JSON { "from_wallet_id" : ไอดีของ Wallet ตั้งต้น , "to_wallet_id" : ไอดีของ Wallet ปลายทาง, "amount" : จำนวนที่จะโอนจาก Wallet ตั้งต้น }
