import React from 'react'
import { connect } from 'react-redux'
import { endSession } from '../actions/sessionActions'
import { Menu } from 'semantic-ui-react'

const LeftMenu = ({ session, endSession }) => {
    console.log(session)
    if (session) {
        return (
            <Menu vertical fluid >
                {session.apis.map(api => {
                    if (api.authUrl) {
                        return (
                            <Menu.Item key={api.api}>
                                <a href={api.authUrl}>
                                    <div>
                                        {api.api}
                                    </div>
                                </a>
                            </Menu.Item>
                        )
                    } else {
                        return (
                            <Menu.Item key={api.api} onClick={() => {endSession(api.api)}}>{`${api.api} logout`}</Menu.Item>
                        )
                    }
                })}
            </Menu>
        )
    }
    return <Menu></Menu>
}

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

const mapActionToProps = {
    endSession
  }

export default connect(mapStateToProps, mapActionToProps)(LeftMenu)