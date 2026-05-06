import fs from 'fs';
let code = fs.readFileSync('./src/components/OrderManagement.tsx', 'utf-8');

// replace pending_refund strings in tabs and labels
code = code.replace(/pending_refund/g, 'after_sales');
code = code.replace(/'待售后'/g, "'售后处理'");
code = code.replace(/'待退款'/g, "'售后处理'");
code = code.replace(/>待退款</g, ">售后处理<");
code = code.replace(/申请退款/g, "申请售后");
code = code.replace(/已退款/g, "售后已完成");

fs.writeFileSync('./src/components/OrderManagement.tsx', code);
