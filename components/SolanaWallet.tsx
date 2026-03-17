import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

  const addWallet = () => {
    if (!mnemonic) return;
    const seed = mnemonicToSeedSync(mnemonic); // Returns a Uint8Array, 64-byte & master seed
    console.log(seed.toString("hex"));

    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key; // What this function does is : Creates seeds specific for a wallet derived from the derivation path
    //  Ex : m/44'/501'/1'/0 || m/44'/501'/2'/0 so these two derivation paths are different and they will have a child seed for specific wallet
    const keypair = Keypair.fromSeed(derivedSeed);
    console.log(keypair);
  };

  return (
    <div>
      <button onClick={addWallet}>Add wallet</button>
      {publicKeys.map((p) => (
        <div>{p.toBase58()}</div>
      ))}
    </div>
  );
}
