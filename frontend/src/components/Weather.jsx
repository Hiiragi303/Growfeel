export function Weather({ onChange }) {
    const buttons = [
        ["clear", "快晴"],
        ["sunny", "晴れ(雲)"],
        ["rain", "雨"],
        ["thunder", "雷雨"],
        ["mist", "霧"],
        ["typhoon", "台風"],
        ["rainbow", "快晴(虹)"],
    ];

    return (
        <div className="bg-white border border-black p-3 rounded shadow flex flex-col gap-2">
            {buttons.map(([key, label]) => {
                return <button
                    key={key}
                    onClick={() => onChange(key)}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                >{label}</button>
            })}
        </div>
    );
}