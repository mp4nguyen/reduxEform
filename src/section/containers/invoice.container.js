import { connect } from 'react-redux'
import Invoice from '../components/invoice'
import { getInvoices } from '../../redux/actions/invoiceActions'
const mapDispatchToProps = (dispatch) => {
    return {
        getInvoices: () => dispatch(getInvoices()),
        rowClick: (item) => {
            console.log('click on row'+ item)
        }
    }
}

const mapStateToProps = (state) => {
    const { list } = state.invoices
    return {
        list
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Invoice)