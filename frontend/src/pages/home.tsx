import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";


const Home = () => {

    const router = useRouter();
    const { address } = router.query;
    const [addressAccess, setAddressAccess] = useState(address);
      
    const onGerminar = () => {
        router.push('/germinacion');
    }

    const onListar = () => {
        router.push('/listar');
    }

    return (
        <div className="flex flex-col max-w-2xl mt-28 mx-auto">
            <h1 className="flex justify-center mb-7">Bienvenido {addressAccess}...</h1>
                <Button
                    className="w-56 mx-auto mb-5"
                    size="lg"
                    color="primary"
                    onPress={ onGerminar }
                >
                    Germinar Nueva Semilla
                </Button>
                <Button
                    className="w-56 mx-auto"
                    size="lg"
                    color="primary"
                    onPress={ onListar }
                >
                    Ver Todas
                </Button>
        </div>
    )
}

export default Home