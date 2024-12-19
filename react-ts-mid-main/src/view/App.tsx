import React, { useEffect, useState } from 'react';
import '../style/App.css';
import { getAllUsers, addUser, deleteUser, updateUserName } from '../apiService';



interface Student {
  absences: number;
  class: string;
  grade: string;
  sid: string;
  _id: string;
  userName: string;
  name: string;
  department: string;
  Email: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [students, setStudents] = useState<Student[]>([]);
  const [newUser, setNewUser] = useState({
  userName: '',
  name: '',
  sid: '', // 新增座號欄位
  department: '',
  grade: '',
  class: '',
  Email: '',
  absences: 0,
});

  const [updateData, setUpdateData] = useState({ id: '', name: '', userName: '', department: '', Email: '' });

  // 載入所有學生資料
  const fetchAllStudents = async () => {
    const response = await getAllUsers();
    if (response.data.code === 200) setStudents(response.data.body);
  };

  useEffect(() => {
    if (currentPage === 'allStudents') fetchAllStudents();
  }, [currentPage]);

  // 新增學生
  const handleAddUser = async () => {
    if (newUser.userName && newUser.name) {
      await addUser(newUser);
      fetchAllStudents();
      setNewUser({ userName: '', name: '', sid: '', department: '', grade: '', class: '', Email: '', absences: 0 });
    }
  };

  // 刪除學生
  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    fetchAllStudents();
  };
  const [editingId, setEditingId] = useState<string | null>(null); // 當前正在編輯的學生 ID
  const [editingName, setEditingName] = useState<string>('');     // 新名稱
  
  // 修改學生名稱
  const handleUpdateUserName = async (id: string) => {
    try {
      if (editingName.trim()) {
        await updateUserName(id, editingName); // 呼叫 API 更新名稱
        fetchAllStudents(); // 更新後重新取得所有學生資料
        setEditingId(null); // 清除編輯狀態
        setEditingName('');
      } else {
        alert('請輸入有效的名稱！');
      }
    } catch (error) {
      console.error('更新學生資料失敗:', error);
      alert('更新失敗，請重試！');
    }
  };
  
  

  const renderPage = () => {
    switch (currentPage) {
      case 'allStudents':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">所有學生列表</h2>
            <ul>
              {students.map((student) => (
                <li key={student._id} className="p-2 border-b flex justify-between items-center">
                  <div>
                    <p>帳號: {student.userName}</p>
                    <p>姓名: {student.name}</p>
                    <p>座號: {student.sid || '未提供'}</p>
                    <p>年級: {student.grade || '未提供'}</p>
                    <p>班級: {student.class || '未提供'}</p>
                    <p>院系: {student.department || '未提供'}</p>
                    <p>Email: {student.Email || '未提供'}</p>
                    <p>缺席次數: {student.absences ?? 0}</p>
                  </div>
      
                  {/* 修改、刪除按鈕邏輯 */}
                  <div className="flex space-x-2">
                    {editingId === student._id ? (
                      // 編輯模式：顯示輸入框與確認/取消按鈕
                      <>
                        <input
                          type="text"
                          className="border p-1 rounded"
                          placeholder="輸入新姓名"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                        />
                        <button
                          onClick={() => handleUpdateUserName(student._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                        >
                          確認
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditingName('');
                          }}
                          className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                        >
                          取消
                        </button>
                      </>
                    ) : (
                      // 正常模式：顯示「修改」和「刪除」按鈕
                      <>
                        <button
                          onClick={() => {
                            setEditingId(student._id); // 設定正在編輯的 ID
                            setEditingName(student.name); // 預填目前的名稱
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                        >
                          修改姓名
                        </button>
                        <button
                          onClick={() => handleDeleteUser(student._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          刪除
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      
      
        
  case 'addStudent':
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">新增學生</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">帳號:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="輸入帳號"
              value={newUser.userName}
              onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700">姓名:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="輸入姓名"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div>
  <label className="block text-gray-700">座號:</label>
  <input
    type="text"
    className="w-full p-2 border rounded"
    placeholder="輸入座號"
    value={newUser.sid}
    onChange={(e) => setNewUser({ ...newUser, sid: e.target.value })}
  />
</div>

          <div>
            <label className="block text-gray-700">院系:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="輸入院系"
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700">年級:</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="輸入年級"
              onChange={(e) => setNewUser({ ...newUser, grade: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700">班級:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="輸入班級"
              onChange={(e) => setNewUser({ ...newUser, class: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="輸入 Email"
              onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700">缺席次數:</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="0"
              value={newUser.absences || 0}
              onChange={(e) => setNewUser({ ...newUser, absences: Number(e.target.value) })}
            />
          </div>
          <button
            type="button"
            onClick={handleAddUser}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            確認新增 
          </button>
        </form>
      </div>
    );
  
    case 'updateStudent':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">✏️ 修改學生資料</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">學生 ID:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="輸入學生 ID"
                value={updateData.id}
                onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">新帳號:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="輸入新帳號"
                onChange={(e) => setUpdateData({ ...updateData, userName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">新姓名:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="輸入新姓名"
                onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">新院系:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="輸入新院系"
                onChange={(e) => setUpdateData({ ...updateData, department: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">新 Email:</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                placeholder="輸入新 Email"
                onChange={(e) => setUpdateData({ ...updateData, Email: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={() => handleUpdateUserName(updateData.id)}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700"
            >
              確認修改 ✏️
            </button>
          </form>
        </div>
      );
    
      default:
        return <div className="text-center text-2xl font-bold mt-20">StudentHub </div>;
    }
  };

  return (
    <div className="h-screen">
      {/* 上方欄 */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">StudentHub</div>
        <ul className="flex space-x-6">
          <li className="cursor-pointer hover:text-yellow-300" onClick={() => setCurrentPage('home')}>
            首頁
          </li>
          <li className="cursor-pointer hover:text-yellow-300" onClick={() => setCurrentPage('allStudents')}>
            所有學生
          </li>
          <li className="cursor-pointer hover:text-yellow-300" onClick={() => setCurrentPage('addStudent')}>
            新增學生
          </li>
         
        </ul>
      </nav>

      {/* 主內容 */}
      <main className="p-10 bg-gray-100 h-full">{renderPage()}</main>
    </div>
  );
};

export default App;
