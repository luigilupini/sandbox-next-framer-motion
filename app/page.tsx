//@ts-nocheck

import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Home() {
  const directoryPath = path.join(process.cwd(), 'app');
  const files = fs.readdirSync(directoryPath);
  const folders = files.filter((file) =>
    fs.statSync(path.join(directoryPath, file)).isDirectory()
  );

  // Group folders based on prefix
  const folderGroups = folders.reduce((acc, folder) => {
    const prefix = folder.split('-')[0];
    if (!acc[prefix]) acc[prefix] = [];
    acc[prefix].push(folder);
    return acc;
  }, {});

  return (
    <main className='grid place-content-center w-full h-full overflow-x-hidden px-2'>
      <h1 className='absolute text-xl font-bold px-2 text-gray-900 top-2 left-2 bg-yellow-500 rounded-full'>
        Animation Sandbox
      </h1>
      <main>
        {Object.entries(folderGroups).map(([prefix, groupFolders]) => (
          <div key={prefix} className='p-2 mt-4 rounded bg-gray-600/20'>
            <h2 className='mb-2 text-white/50'>{`Group ${prefix}`}</h2>
            <ol className='flex flex-wrap w-full gap-2'>
              {groupFolders.map((folder) => (
                <li
                  key={folder}
                  className='px-2 py-1 text-[13px] border border-gray-700 rounded-md w-fit hover:bg-gray-700'
                >
                  <Link href={`/${folder}`}>{folder}</Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </main>
    </main>
  );
}
