import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallet, setwallet] = useState<{ public: string; private: string }[]>(
    [],
  );

  const addWallet = () => {
    if (!mnemonic) return;
    const seed = mnemonicToSeedSync(mnemonic); // Returns a Uint8Array, 64-byte & master seed
    console.log(seed.toString("hex"));

    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key; // What this function does is : Creates seeds specific for a wallet derived from the derivation path
    //  Ex : m/44'/501'/1'/0 || m/44'/501'/2'/0 so these two derivation paths are different and they will have a child seed for specific wallet
    const keypair = Keypair.fromSeed(derivedSeed);
    setwallet([
      ...wallet,
      {
        public: keypair.publicKey.toBase58(),
        private: bs58.encode(keypair.secretKey),
      },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      <button onClick={addWallet}>Add wallet</button>

      {wallet.map((w, index) => (
        <div
          key={index}
          style={{ marginBottom: "10px", border: "1px solid #ccc" }}
        >
          <p>
            <strong>Public:</strong> {w.public}
          </p>
          <p>
            <strong>Private (Hex):</strong> {w.private}
          </p>
        </div>
      ))}
    </div>
  );
}
