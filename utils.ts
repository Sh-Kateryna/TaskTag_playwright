export function getCurrentDateTime(format: string = 'YYYYMMddHHmmss'): string {
    const now = new Date();
    
    const map: Record<string, string> = {
      YYYY: now.getFullYear().toString(),
      YY: now.getFullYear().toString().slice(-2),
      MM: (now.getMonth() + 1).toString().padStart(2, '0'),
      dd: now.getDate().toString().padStart(2, '0'),
      HH: now.getHours().toString().padStart(2, '0'),
      mm: now.getMinutes().toString().padStart(2, '0'),
      ss: now.getSeconds().toString().padStart(2, '0'),
    };
  
    return format.replace(/YYYY|YY|MM|dd|HH|mm|ss/g, (match) => map[match]);
  }
  