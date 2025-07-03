import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const mint = new PublicKey("6n62VuS1zGNe6VidFSCKgCt4AvjyJcBqBZZXNrPsigun");
const to = new PublicKey("HfTNs1hp4G7BBjQNAmbpJLmJjwDLVgFUP2y2rcDw4xoC");

const token_decimals = 1_000_000;

(async () => {
    try {
        const ata_from = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        const ata_to = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to)
        const tx = await transfer(connection, keypair, ata_from.address, ata_to.address, keypair.publicKey, 10 * token_decimals)
        console.log('transfer tx:', tx)
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
