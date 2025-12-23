// 确保库已加载
console.log("bip39:", window.bip39);
console.log("bip32:", window.bip32);

document.getElementById("generateBtn").addEventListener("click", generateAll);

function generateAll() {
  // 1. 生成助记词
  const mnemonic = bip39.generateMnemonic();
  document.getElementById("mnemonic").value = mnemonic;

  // 2. BTC 地址（BIP44）
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, bitcoinjs.networks.bitcoin);
  const child = root.derivePath("m/44'/0'/0'/0/0");

  const { address: btcAddress } = bitcoinjs.payments.p2pkh({
    pubkey: child.publicKey,
    network: bitcoinjs.networks.bitcoin
  });

  document.getElementById("btc").value = btcAddress;

  // 3. ETH 地址
  const ethWallet = ethers.Wallet.fromMnemonic(mnemonic);
  document.getElementById("eth").value = ethWallet.address;

  // 4. TRON（演示用：ETH 地址简单替换）
  document.getElementById("tron").value =
    "T" + ethWallet.address.slice(2, 34);
}
