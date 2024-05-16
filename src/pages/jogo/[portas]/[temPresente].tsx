import Porta from '@/components/Porta';
import PortaModel from "../../../model/porta";
import { useEffect, useState } from 'react';
import { atualizarPortas, criarPortas } from '@/functions/portas';
import styles from "@/styles/Jogo.module.css"
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Jogo() {
    const router = useRouter()

    const [portas, setPortas] = useState<PortaModel[]>([])
    const [valido, setValido] = useState(false)

    useEffect(() => {
        const portas = Number(router.query.portas)
        const temPresente = Number(router.query.temPresente)
        const qtdPortasValida = portas >= 3 && portas <= 100
        const temPresenteValido = temPresente >= 1 && temPresente <= portas

        setValido(qtdPortasValida && temPresenteValido)
    }, [portas, router.query.portas, router.query.temPresente])

    useEffect(() => {
        const portas = Number(router.query.portas)
        const temPresente = Number(router.query.temPresente)
        setPortas(criarPortas(portas, temPresente))
    }, [router?.query])


    function renderizarPortas() {
        return portas.map((porta: PortaModel) => {
            return <Porta key={porta.numero} value={porta} onChange={novaPorta => setPortas(atualizarPortas(portas, novaPorta))} />
        })
    }

    return (
        <div id={styles.jogo}>
            <div className={styles.portas}>
                {valido ? renderizarPortas() : <h2>Valores inválidos</h2>}
            </div>
            <div className={styles.botoes}>
                <Link href="/" passHref>
                    <button>Reiniciar Jogo</button>
                </Link>
            </div>
        </div>
    );
}