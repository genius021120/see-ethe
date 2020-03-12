import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledCollapse,
  FormGroup,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import {
  faArrowDown, faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons"

import { RinkebyWeth } from '../../contract/ether_wrap';

export default class WethWrite extends React.Component {
  constructor() {
    super()
    this.state = {
      guyApprove: '',
      wadApprove: '',
      approveResult: '...loading',
      account: '',
    }

    this.setupConnection = this.setupConnection.bind(this);
    this.test = this.test.bind(this)
  }


  isConnected() {
    if (typeof window.ethereum !== 'undefined') {
      return true
    }
    return false
  }

  isRinkeby() {
    if (this.isConnected() && window.ethereum.networkVersion === '4') {
      return true;
    }
    return false;
  }

  isRinkebyAlert() {
    if (!this.isRinkeby()) {
      alert('You are not connected to Rinkbey test net. Please connect to Rinkeby through Meta Mask')
      return false;
    }
    return true;
  }

  // takes in a function to execut after setting up meta mask
  setupConnection() {
    window.ethereum.enable()
      .then((accounts) => {
        console.log(accounts[0])
        this.setState({ account: accounts[0] })
      })
      .catch((err) => {
        alert('There was an error setting up the meta mask connection', err)
      })
  }

  setProvider() {
    if (typeof window.ethereum !== 'undefined') {
      this.setState({ provider: window['ethereum'] })
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  connectionButton() {
    return (
      <Button onClick={this.setupConnection} className='query-btn f-13'>
        Connect to Web3 with Meta Mask
      </Button>
    )
  }

  test() {

    this.setupConnection()
    const writeFunc = (account) => {
      if (this.isRinkebyAlert()) {
        const options = { from: account, value: 1 }
        RinkebyWeth.methods.deposit()
          
      }
    }
    console.log(this.state.account)
    writeFunc(this.state.account)

  }

  testButton() {
    return (
      <Button onClick={this.test} className='query-btn f-13'>
        Run transaction
      </Button>
    )
  }

  render() {

    let circleClass = this.isConnected ? 'user-circle green' : 'user-circle red'

    return (
      <div>
        <div className='d-flex justify-content-between mb-3 pt-2'>
          <p className='ft-13'>
            {}
            <FontAwesomeIcon icon={faCircle}
              size="lg" className={circleClass}
            />
            Write Contract
          </p>
          <a className='ft-13'> {this.connectionButton()}</a>
          {this.testButton()}
        </div>

        <Card className='mb-3 ft-13'>
          <CardHeader className='d-flex justify-content-between align-items-center p-0 grey-soft-bg'>
            <span className='pl-1'>1. approve</span>
            <Button className='pr-2' close aria-label="Cancel" id="approve">
              <span aria-hidden>
                <FontAwesomeIcon icon={faArrowDown}
                  size="lg" className='user-circle down-arrow'
                />
              </span>
            </Button>
          </CardHeader>

          <UncontrolledCollapse toggler="approve">
            <CardBody>
              <Form>
                <FormGroup className='mb-0 w-100'>
                  <Label className='mb-2 w-100'> {"guy (address)"}
                  </Label>
                  <Input
                    className='w-100 grey mono-txt ft-13'
                    type="text"
                    name="guyApprove"
                    id="guyApprove"
                    placeholder="guy (address)"
                    value={this.state.guyApprove}
                    onChange={this.update('guyApprove')}
                  />

                  <Label className='mb-2 mt-3 w-100'> {"wad (address)"}
                  </Label>
                  <Input
                    className='w-100 grey mono-txt ft-13'
                    type="text"
                    name="wadApprove"
                    id="wadApprove"
                    placeholder="wad (address)"
                    value={this.state.wadApprove}
                    onChange={this.update('wadApprove')}
                  />
                </FormGroup>
                <Button
                  id='approveQuery'
                  className='query-btn f-13'
                // onClick={}
                >
                  Query
                </Button>
              </Form>
              <div className='mono-txt grey'>
                &nbsp;<i>uint256</i>
              </div>

              <UncontrolledCollapse toggler='#approveQuery'>
                <div className='responseCollapse gray'>
                  <div>[&nbsp;<b>approve</b> method Response &nbsp;]</div>
                  <span>
                    <FontAwesomeIcon icon={faAngleDoubleRight}
                      size="lg" className='user-circle green'
                    />
                  </span>
                  &nbsp; <i>bool:</i>&nbsp;  {this.state.approveResult}
                </div>
              </UncontrolledCollapse>

            </CardBody>
          </UncontrolledCollapse>
        </Card>




      </div>
    )
  }

}