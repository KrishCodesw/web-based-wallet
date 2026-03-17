import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "../components/SolanaWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  async function handlegenerateMnemonic() {
    const mnemonics = await generateMnemonic();
    setMnemonic(mnemonics);
  }

  return (
    <>
      <div>
        {/* <input type="text" value={mnemonic}></input> */}
        <button onClick={handlegenerateMnemonic}>Create Seed</button>
        <p>{mnemonic}</p>

        <SolanaWallet mnemonic={mnemonic} />
      </div>
    </>
  );
}

export default App;
