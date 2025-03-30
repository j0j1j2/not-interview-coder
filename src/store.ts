import Store from 'electron-store';

interface StoreSchema {
  openAiApiKey: string;
}

interface StoreSchema {
  openAIApiKey?: string; 
}

const store = new Store<StoreSchema>();

export default store; 