/**
 * Script untuk Sync API Keys ke Multiple Projects di Cloudflare Pages
 * 
 * Cara menggunakan:
 * 1. Install dependencies: npm install axios dotenv
 * 2. Set environment variables:
 *    - CLOUDFLARE_API_TOKEN (dapatkan dari https://dash.cloudflare.com/profile/api-tokens)
 *    - CLOUDFLARE_ACCOUNT_ID (dapatkan dari dashboard Cloudflare)
 * 3. Edit file api-keys-config.json dengan API keys dan project names
 * 4. Jalankan: node scripts/sync-api-keys.js
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

// Config file path
const CONFIG_PATH = path.resolve(process.cwd(), 'api-keys-config.json');

// Cloudflare API base URL
const API_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects`;

// Environment variables yang akan di-sync
const ENV_VARS_TO_SYNC = [
  'GEMINI_API_KEY',
  'PEXELS_API_KEY',
  'BACKDATE_DAYS',
  'FUTURE_SCHEDULE_DAYS',
  'NODE_VERSION'
];

async function getProjectEnvVars(projectName) {
  try {
    // Get project details
    const response = await axios.get(`${API_BASE}/${projectName}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.result?.deployment_configs || {};
  } catch (error) {
    console.error(`Error getting env vars for ${projectName}:`, error.response?.data || error.message);
    return null;
  }
}

async function setProjectEnvVar(projectName, varName, varValue, environments = ['production', 'preview']) {
  try {
    // Cloudflare Pages API untuk set environment variable
    // Note: API format mungkin berbeda, cek dokumentasi terbaru
    const response = await axios.patch(
      `${API_BASE}/${projectName}/deployments/config`,
      {
        env_vars: {
          [varName]: {
            value: varValue,
            environments: environments
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error(`Error setting ${varName} for ${projectName}:`, error.response?.data || error.message);
    throw error;
  }
}

async function syncApiKeysToProject(projectName, apiKeys) {
  console.log(`\n📦 Syncing API keys to project: ${projectName}`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [varName, varValue] of Object.entries(apiKeys)) {
    if (ENV_VARS_TO_SYNC.includes(varName) || varName.startsWith('VITE_')) {
      try {
        await setProjectEnvVar(projectName, varName, varValue);
        console.log(`  ✅ ${varName} synced successfully`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Failed to sync ${varName}`);
        failCount++;
      }
    }
  }
  
  return { successCount, failCount };
}

async function main() {
  // Validasi
  if (!API_TOKEN) {
    console.error('❌ CLOUDFLARE_API_TOKEN tidak ditemukan!');
    console.log('Dapatkan dari: https://dash.cloudflare.com/profile/api-tokens');
    console.log('Buat token dengan permissions: Account.Cloudflare Pages.Edit');
    process.exit(1);
  }

  if (!ACCOUNT_ID) {
    console.error('❌ CLOUDFLARE_ACCOUNT_ID tidak ditemukan!');
    console.log('Dapatkan dari: Cloudflare Dashboard → Right sidebar → Account ID');
    process.exit(1);
  }

  // Baca config
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`❌ File config tidak ditemukan: ${CONFIG_PATH}`);
    console.log('Buat file api-keys-config.json terlebih dahulu!');
    console.log('Lihat api-keys-config.example.json untuk contoh.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  
  if (!config.apiKeys || !config.projects) {
    console.error('❌ Config file tidak valid!');
    console.log('Pastikan config memiliki "apiKeys" dan "projects"');
    process.exit(1);
  }
  
  console.log('🚀 Starting API keys sync...');
  console.log(`📋 Projects to sync: ${config.projects.length}`);
  console.log(`🔑 API keys to sync: ${Object.keys(config.apiKeys).length}`);
  
  let totalSuccess = 0;
  let totalFail = 0;
  
  // Sync ke setiap project
  for (const projectName of config.projects) {
    try {
      const result = await syncApiKeysToProject(projectName, config.apiKeys);
      totalSuccess += result.successCount;
      totalFail += result.failCount;
    } catch (error) {
      console.error(`❌ Failed to sync project ${projectName}:`, error.message);
      totalFail++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Sync completed!');
  console.log(`✅ Success: ${totalSuccess}`);
  console.log(`❌ Failed: ${totalFail}`);
  console.log('='.repeat(50));
  
  if (totalFail > 0) {
    console.log('\n⚠️  Some variables failed to sync. Check errors above.');
    console.log('💡 Note: Cloudflare Pages API format may vary. Check latest documentation.');
  }
}

main().catch(console.error);

