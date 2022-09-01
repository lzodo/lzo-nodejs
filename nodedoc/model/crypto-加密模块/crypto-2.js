const crypto = require("crypto");

/**
 * 生成RSA公私钥对
 * @return {*} publicKey: 公钥;privateKey: 私钥
 */
function genRSAKeyPaire() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });
    return { publicKey, privateKey };
}

// 打印生成的公私钥对
// console.log(genRSAKeyPaire());

const { publicKey ,privateKey} = genRSAKeyPaire();

/**
 * 使用公钥进行加密
 * @param {String} data
 * @param {String} publicKey
 * @return {String} 加密后的密文
 */
function publicKeyEncrypt(data, publicKey) {
    return crypto
        .publicEncrypt(publicKey, Buffer.from(data))
        .toString("base64");
}

const entry = {
    name: "zhangsan",
    password: "123456",
};

// 将数据转为字符串格式，并进行公钥加密后打印
let baseStr = publicKeyEncrypt(JSON.stringify(entry), publicKey);
console.log(baseStr)




// 将 baseStr 解密
/**
 * 使用私钥进行解密
 * @param {String} encryptedData 
 * @param {String} privateKey 
 * @return {String} 解密后的明文
 */
 function privateKeyDecrypt(encryptedData, privateKey) {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString();
  }
  
  const originData = privateKeyDecrypt(baseStr, privateKey);
  
  // 打印用私钥解密后的数据
  console.log(originData);

