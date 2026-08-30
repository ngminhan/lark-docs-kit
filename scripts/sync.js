#!/usr/bin/env node

/**
 * Script đồng bộ tự động tài liệu Lark Docs từ docs/doc-mapping.json
 * 
 * Cách dùng:
 *  1. Cập nhật tất cả docs cũ đã có ID:
 *     node scripts/sync.js
 * 
 *  2. Khởi tạo dự án mới trên Lark Drive (tự động tạo doc & lưu ID vào mapping):
 *     node scripts/sync.js --init <FOLDER_TOKEN>
 * 
 *  3. Cập nhật 1 doc cụ thể:
 *     node scripts/sync.js --doc 01-prd
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MAPPING_FILE = path.join(__dirname, '../docs/doc-mapping.json');

if (!fs.existsSync(MAPPING_FILE)) {
  console.error(`❌ Không tìm thấy file mapping: ${MAPPING_FILE}`);
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));

const args = process.argv.slice(2);
const isInit = args.includes('--init');
const folderTokenIdx = args.indexOf('--init') + 1;
const folderToken = isInit ? args[folderTokenIdx] : null;

const docArgIdx = args.indexOf('--doc') + 1;
const targetDocKey = args.includes('--doc') ? args[docArgIdx] : null;

if (isInit && (!folderToken || folderToken.startsWith('--'))) {
  console.error('❌ Vui lòng cung cấp FOLDER_TOKEN. Ví dụ: node scripts/sync.js --init fldcnXXXXXXXXX');
  process.exit(1);
}

console.log('🚀 Bắt đầu tiến trình đồng bộ Lark Docs...\n');

let updatedMapping = false;

for (const [key, item] of Object.entries(mapping)) {
  if (targetDocKey && key !== targetDocKey) continue;

  const filePath = path.join(__dirname, '..', item.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Bỏ qua ${key}: Không tìm thấy file ${item.file}`);
    continue;
  }

  // Khởi tạo mới nếu chưa có doc_id và đang chạy --init
  if (isInit && !item.doc_id) {
    console.log(`📝 [Tạo mới] ${item.title} -> Folder: ${folderToken}`);
    try {
      const cmd = `npx lark-cli docs +create --folder-token ${folderToken} --doc-format markdown --content @${filePath}`;
      const output = execSync(cmd, { encoding: 'utf8' });
      
      // Tìm doc_id / doc_token từ output trả về của lark-cli
      const match = output.match(/(doccn[a-zA-Z0-9]+|docx[a-zA-Z0-9]+)/);
      if (match) {
        const newDocId = match[0];
        item.doc_id = newDocId;
        updatedMapping = true;
        console.log(`   ✅ Đã tạo thành công! Lark Doc ID: ${newDocId}`);

        // Cập nhật Lark Doc ID vào header file markdown
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/Lark Doc ID: .*/, `Lark Doc ID: ${newDocId}`);
        fs.writeFileSync(filePath, content, 'utf8');
      } else {
        console.log(`   ⚠️ Tạo thành công nhưng không tự động bóc tách được ID. Output:\n${output}`);
      }
    } catch (err) {
      console.error(`   ❌ Lỗi tạo mới ${key}:`, err.message);
    }
  } 
  // Cập nhật doc cũ đã có doc_id
  else if (item.doc_id) {
    console.log(`🔄 [Cập nhật] ${item.title} (ID: ${item.doc_id})`);
    try {
      const cmd = `npx lark-cli docs +update --doc ${item.doc_id} --command overwrite --doc-format markdown --content @${filePath}`;
      execSync(cmd, { stdio: 'inherit' });
      console.log(`   ✅ Cập nhật thành công!`);
    } catch (err) {
      console.error(`   ❌ Lỗi cập nhật ${key}:`, err.message);
    }
  } else {
    console.log(`⏭️ [Bỏ qua] ${item.title}: Chưa có doc_id. Dùng '--init <FOLDER_TOKEN>' để khởi tạo mới.`);
  }
}

if (updatedMapping) {
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf8');
  console.log('\n💾 Đã tự động lưu các Lark Doc ID mới vào docs/doc-mapping.json!');
}

console.log('\n✨ Hoàn tất tiến trình đồng bộ!');
