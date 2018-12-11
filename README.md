# Large Integer Binary Converter
I was completing a project for my algorithms class and hacked this together to help me debug it.

### Description
You will be writing two programs. The first will generate a 512-bit RSA keypair and store the public and private keys in files named pubkey.rsa and privkey.rsa, respectively. The second will generate and verify digital signatures using a SHA-256 hash. You will use Java's MessageDigest class to complete this project. In order for either of these programs to work, however, you will need to complete an implementation of a class to process large integers.

### Why
We were not allowed to use `BigInteger`. We had to make our own class called `LargeInteger`. It was a real pain to debug because the LargeInteger's were internally byte arrays. After getting tired of using a mix of [https://www.omnicalculator.com/math/remainder](https://www.omnicalculator.com/math/remainder),  [https://www.dcode.fr/modular-exponentiation](https://www.dcode.fr/modular-exponentiation), [https://rapidtables.com/convert/number/binary-to-decimal.html](https://rapidtables.com/convert/number/binary-to-decimal.html), and others to debug. I just decided to make this. Uses `BigNumber.js` and some code from Rapid Tables.