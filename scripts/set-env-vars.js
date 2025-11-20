/**
 * Script Helper untuk Set Environment Variables di Cloudflare Pages
 * 
 * Cara menggunakan:
 * 1. Install dependencies: npm install axios
 * 2. Set environment variables:
 *    - CLOUDFLARE_API_TOKEN (dapatkan dari https://dash.cloudflare.com/profile/api-tokens)
 *    - CLOUDFLARE_ACCOUNT_ID (dapatkan dari dashboard Cloudflare)
 *    - PROJECT_NAME (nama project di Cloudflare Pages)
 * 3. Edit file env-vars-template.json dengan values Anda
 * 4. Jalankan: node scripts/set-env-vars.js
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const PROJECT_NAME = process.env.PROJECT_NAME || 'bzone';

// Template file path
const TEMPLATE_PATH = path.resolve(process.cwd(), 'env-vars-template.json');

// Cloudflare API base URL
const API_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}`;

async function getCurrentEnvVars() {
  try {
    const response = await axios.get(`${API_BASE}/deployments`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Get project details untuk environment variables
    const projectResponse = await axios.get(`${API_BASE}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    return projectResponse.data.result?.deployment_configs || {};
  } catch (error) {
    console.error('Error getting current env vars:', error.response?.data || error.message);
    return {};
  }
}

async function setEnvVars(envVars, environment = 'production') {
  try {
    // Cloudflare Pages API untuk set environment variables
    // Note: API ini mungkin berbeda, cek dokumentasi terbaru
    const response = await axios.patch(
      `${API_BASE}/deployments/config`,
      {
        [environment]: {
          env_vars: envVars
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
    console.error(`Error setting env vars for ${environment}:`, error.response?.data || error.message);
    throw error;
  }
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

  // Baca template
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ File template tidak ditemukan: ${TEMPLATE_PATH}`);
    console.log('Buat file env-vars-template.json terlebih dahulu!');
    process.exit(1);
  }

  const template = JSON.parse(fs.readFileSync(TEMPLATE_PATH, 'utf-8'));
  
  console.log(`🚀 Setting environment variables untuk project: ${PROJECT_NAME}`);
  console.log(`📋 Total variables: ${Object.keys(template).length}`);
  
  // Set untuk production dan preview
  const environments = ['production', 'preview'];
  
  for (const env of environments) {
    console.log(`\n📦 Setting variables untuk ${env}...`);
    try {
      await setEnvVars(template, env);
      console.log(`✅ ${env} environment variables berhasil di-set!`);
    } catch (error) {
      console.error(`❌ Gagal set ${env} environment variables`);
    }
  }
  
  console.log('\n✅ Selesai!');
  console.log('💡 Catatan: Cloudflare Pages API mungkin memiliki format berbeda.');
  console.log('   Jika script ini tidak bekerja, gunakan metode manual atau cek dokumentasi terbaru.');
}

main().catch(console.error);

