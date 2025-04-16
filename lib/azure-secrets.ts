import { KeyVaultSecret, SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

export async function getSecret(secretName: string): Promise<KeyVaultSecret> {
    const credentials = new DefaultAzureCredential();
    
    try {
        const client = new SecretClient(process.env.KEYVAULT_URI!, credentials);
        return await client.getSecret(secretName);
        
    } catch (error) {
        console.error(`Error retrieving secret ${secretName}:`, error);
        throw error;
    }
}