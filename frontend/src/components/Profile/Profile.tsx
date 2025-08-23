
export default function Profile() {
  return (
    <>
        <div className="h-[20dvh] bg-amber-400">
        </div>
        <div className="h-[50px] bg-transparent">
            <div className="h-[100px] w-[100px] bg-amber-600 rounded-full -translate-y-1/2 translate-x-[5dvh]"></div>
        </div>
        <div className="bg-amber-200">
            <div>Name: SAMPLE TARO</div>
            <p>ID:@sample_taro</p>
            <p>ここに自己紹介文がはいります。文字数は大体140文字を制限tのしていますのであまり入りません。</p>
        </div>
        <div className="bg-amber-700">
            ここには大体アコーディオンメニューが入る予定
        </div>
    </>
  )
}
