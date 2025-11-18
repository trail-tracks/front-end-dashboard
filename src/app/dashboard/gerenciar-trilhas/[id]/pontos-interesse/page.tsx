'use client';
import { useRouter } from 'next/navigation';

const pontos = [
    {
        id: '1',
        imageUrl:
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
        title: 'Ponto de Interesse Teste',
        interaction: '25',
    }
];

function PontosInteresse() {

    const router = useRouter();
    return (
        <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-6 w-full min-h-full">
            <div className="flex justify-between items-center flex-row">
                <h1 className="text-2xl font-bold text-primary-dark">
                    Pontos de Interesse da trilha
                </h1>

            </div>
            
            
            <div className="flex flex-row gap-6 p-3">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                    {pontos.map((ponto) => (
                        <div
                            key={ponto.id}
                            className="flex flex-col border rounded-lg shadow-md p-3 bg-white w-60"
                        >
                            <img
                                src={ponto.imageUrl}
                                alt={ponto.title}
                                className="w-full h-32 object-cover rounded-md mb-3"
                            />
                            <h2 className="text-md font-semibold text-primary-dark mb-2">
                                {ponto.title}
                            </h2>
                            <p className="text-xs text-gray-600">Interações: {ponto.interaction}</p>
                        </div>
                    ))}
                </div>
                <div
                    className="w-60 flex flex-col border rounded-lg shadow-md p-4 bg-gray-100 justify-center items-center cursor-pointer hover:bg-gray-200 transition"
                    onClick={() => {
                        console.log('Adicionar novo ponto de interesse');
                    }}
                >
                    <span className="text-4xl text-primary-medium font-bold">+</span>
                    <p className="text-sm text-gray-600 mt-2">Adicionar Ponto</p>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    className="bg-primary-medium text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark transition"
                    onClick={() => router.back()}
                >
                    Concluído
                </button>
            </div>

        </div>
    );
}

export default PontosInteresse;
