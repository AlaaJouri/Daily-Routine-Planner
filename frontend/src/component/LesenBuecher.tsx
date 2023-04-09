import {Buch} from "../model/Buch";
import LesenBuch from "./LesenBuch";
import useAuth from "../hooks/useAuth";
import Layout from "./Layout";

type BuecherProps = {

    buecher: Buch[]
    deleteBuch: (id: string) => void

}

export default function LesenBuecher (props: BuecherProps) {
    const user = useAuth(true);
    const buecher = props.buecher
        .map((buecher) => {
            return (
                <LesenBuch buch={buecher} key={buecher.id} deleteBuch={props.deleteBuch}/>)
        })
    return (
        <Layout>
            {!user ? <p>Loading...</p> : (
                <div>
                    {buecher}
                </div>
            )}
        </Layout>
    )
}
